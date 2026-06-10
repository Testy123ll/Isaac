import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Upload, Eye, AlertCircle, RefreshCw } from 'lucide-react';

interface Testimonial {
  id?: string;
  name: string;
  position: string;
  company: string;
  body: string;
  avatar_url: string;
  order_index: number;
}

export const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [body, setBody] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [orderIndex, setOrderIndex] = useState(0);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err: any) {
      console.error('Failed to fetch testimonials:', err);
      setError(err.message || 'Failed to load testimonials from database.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPosition('');
    setCompany('');
    setBody('');
    setAvatarUrl('');
    setOrderIndex(0);
    setEditingId(null);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('testimonial-avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('testimonial-avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Check if testimonial-avatars bucket is public.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id || null);
    setName(t.name);
    setPosition(t.position);
    setCompany(t.company);
    setBody(t.body);
    setAvatarUrl(t.avatar_url);
    setOrderIndex(t.order_index);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const tData = {
      name,
      position,
      company,
      body,
      avatar_url: avatarUrl,
      order_index: Number(orderIndex),
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(tData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([tData]);
        if (error) throw error;
      }
      setFormOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to save testimonial:', err);
      alert('Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2">Testimonials</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">// Client success reviews</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-sm tracking-wider uppercase transition-colors"
        >
          <Plus size={16} /> Add Review
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-900/40 border border-slate-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-slate-900/40 border border-slate-800 rounded-3xl">
          <AlertCircle className="text-red-400" size={28} />
          <p className="text-red-400 font-mono text-sm text-center max-w-sm">{error}</p>
          <button onClick={fetchTestimonials} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors">
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Avatar</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Position / Company</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500 font-mono">
                      // No testimonials found. Add your first client review.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 rounded-full border border-slate-800 bg-slate-950 overflow-hidden flex items-center justify-center text-xs font-mono font-bold text-blue-400">
                          {t.avatar_url ? (
                            <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                          ) : (
                            t.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">{t.name}</td>
                      <td className="px-6 py-4 text-sm font-mono">{t.position} at {t.company}</td>
                      <td className="px-6 py-4 text-sm font-mono">{t.order_index}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(t)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id!)}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold font-header text-white">
                {editingId ? 'Edit Testimonial' : 'New Testimonial'}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Client Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Position / Job Title</label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Founder & CEO"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Company</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Order Index</label>
                  <input
                    type="number"
                    required
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-center"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Testimonial Body</label>
                <textarea
                  required
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="The text body of the testimonial review..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Avatar Image Section */}
              <div className="p-5 border border-slate-800 bg-slate-950/40 rounded-2xl space-y-4">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-widest block font-semibold">// Client Avatar (Supabase Storage)</label>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {avatarUrl ? (
                    <div className="w-20 h-20 rounded-full border border-slate-800 bg-slate-900 overflow-hidden shrink-0 relative group">
                      <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={avatarUrl} target="_blank" rel="noreferrer" className="text-white p-2">
                          <Eye size={16} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 text-slate-600 font-mono text-xs font-bold text-center">
                      Initials
                    </div>
                  )}
                  <div className="flex-1 space-y-2 w-full">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        id="avatar-file"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        disabled={uploadingAvatar}
                      />
                      <label
                        htmlFor="avatar-file"
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 rounded-xl font-mono text-xs uppercase cursor-pointer text-slate-300 hover:text-white transition-colors"
                      >
                        <Upload size={14} /> 
                        {uploadingAvatar ? 'Uploading...' : 'Upload Avatar'}
                      </label>
                    </div>
                    <p className="text-slate-500 text-xs font-mono leading-relaxed">
                      Saves to 'testimonial-avatars' bucket. If left blank, initials are displayed as fallback.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-3 border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-mono text-xs uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
