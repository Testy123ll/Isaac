import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Upload, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

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
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2 tracking-tight">Client Endorsements</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">// Manage client reviews</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Plus size={15} /> Add Endorsement
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-900/30 border border-slate-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-slate-900/10 border border-slate-800 rounded-3xl">
          <AlertCircle className="text-red-400 animate-pulse" size={28} />
          <p className="text-red-400 font-mono text-sm text-center max-w-sm">{error}</p>
          <button onClick={fetchTestimonials} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer">
            <RefreshCw size={14} /> Retry Query
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-500 font-mono text-xs uppercase tracking-widest bg-slate-950/20">
                  <th className="px-6 py-4.5">Client User</th>
                  <th className="px-6 py-4.5">Profile Name</th>
                  <th className="px-6 py-4.5">Job Designation / Entity</th>
                  <th className="px-6 py-4.5">Index Order</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-sans text-slate-300">
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-600 font-mono text-xs uppercase tracking-wider">
                      // Endorsements queue empty. Add client feedback.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden flex items-center justify-center text-xs font-mono font-bold text-purple-400 shadow-inner">
                          {t.avatar_url ? (
                            <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                          ) : (
                            t.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">{t.name}</td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-400">{t.position} at <span className="text-slate-300">{t.company}</span></td>
                      <td className="px-6 py-4 text-xs font-mono">{t.order_index}</td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleEdit(t)}
                          className="p-2 text-slate-500 hover:text-white hover:bg-slate-900/60 border border-transparent hover:border-slate-800 rounded-xl transition-all cursor-pointer"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id!)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/10 border border-transparent hover:border-red-900/10 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash2 size={14} />
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800/80 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-slate-800/60 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold font-header text-white tracking-wide">
                {editingId ? 'Edit Endorsement block' : 'Register Client Endorsement'}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6 flex-1">
              
              {/* Form Grid: Group 1 (Identity) */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                  <MessageSquare size={14} /> // Client details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Client Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Austin Dental Clinic"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Position / Job Title</label>
                    <input
                      type="text"
                      required
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="e.g. Operations Lead"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Company / Entity</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Impact Pest Control"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Index Order</label>
                    <input
                      type="number"
                      required
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white text-center focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Text Body */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Endorsement text body</label>
                <textarea
                  required
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Isaac completely transformed our website..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                />
              </div>

              {/* Avatar File Dropzone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Client Profile Avatar</label>
                <div className="p-6 border border-dashed border-slate-800 bg-slate-950/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
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
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer text-center py-2"
                  >
                    {avatarUrl ? (
                      <div className="relative w-20 h-20 rounded-full border border-slate-800 bg-slate-900 overflow-hidden shadow-lg shadow-black/40">
                        <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[9px] text-white font-mono uppercase tracking-wider">Change</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-400 transition-colors shadow-inner">
                          <Upload size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-200 block">Click to upload avatar file</span>
                          <span className="text-[10px] font-mono text-slate-500 block uppercase mt-1">Accepts PNG/JPG/WebP · max 2MB</span>
                        </div>
                      </>
                    )}
                    {uploadingAvatar && (
                      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-slate-300">Uploading File...</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-slate-800/80 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-3 border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl font-mono text-xs uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-600/50 disabled:to-indigo-600/50 text-white rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Endorsement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
