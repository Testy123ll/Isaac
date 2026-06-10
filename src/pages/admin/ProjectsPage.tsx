import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Upload, Eye, AlertCircle, RefreshCw } from 'lucide-react';

interface Project {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  imageUrl: string;
  type: 'client' | 'personal';
  order_index: number;
  caseStudy: {
    overview: string;
    challenges: string[];
    solutions: string[];
    results: string[];
  };
}

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [techStackText, setTechStackText] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState<'client' | 'personal'>('client');
  const [orderIndex, setOrderIndex] = useState(0);

  // Case Study fields
  const [csOverview, setCsOverview] = useState('');
  const [csChallengesText, setCsChallengesText] = useState('');
  const [csSolutionsText, setCsSolutionsText] = useState('');
  const [csResultsText, setCsResultsText] = useState('');

  // Upload preview
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      console.error('Failed to fetch projects:', err);
      setError(err.message || 'Failed to load projects from database.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setCategory('');
    setDescription('');
    setTechStackText('');
    setLiveUrl('');
    setImageUrl('');
    setType('client');
    setOrderIndex(0);
    setCsOverview('');
    setCsChallengesText('');
    setCsSolutionsText('');
    setCsResultsText('');
    setEditingId(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image. Make sure project-images bucket is public.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id || null);
    setTitle(project.title);
    setSlug(project.slug);
    setCategory(project.category);
    setDescription(project.description);
    setTechStackText(project.techStack.join(', '));
    setLiveUrl(project.liveUrl);
    setImageUrl(project.imageUrl);
    setType(project.type);
    setOrderIndex(project.order_index);

    // Case Study fields
    const cs = project.caseStudy || {};
    setCsOverview(cs.overview || '');
    setCsChallengesText(cs.challenges?.join('\n') || '');
    setCsSolutionsText(cs.solutions?.join('\n') || '');
    setCsResultsText(cs.results?.join('\n') || '');

    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const projectData = {
      title,
      slug,
      category,
      description,
      techStack: techStackText.split(',').map((s) => s.trim()).filter(Boolean),
      liveUrl,
      imageUrl,
      type,
      order_index: Number(orderIndex),
      caseStudy: {
        overview: csOverview,
        challenges: csChallengesText.split('\n').map((s) => s.trim()).filter(Boolean),
        solutions: csSolutionsText.split('\n').map((s) => s.trim()).filter(Boolean),
        results: csResultsText.split('\n').map((s) => s.trim()).filter(Boolean),
      },
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        if (error) throw error;
      }
      setFormOpen(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Failed to save project data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2">Projects</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">// Showcase of custom works</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-sm tracking-wider uppercase transition-colors"
        >
          <Plus size={16} /> Add Project
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
          <button onClick={fetchProjects} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors">
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category/Niche</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500 font-mono">
                      // No projects found. Add your first project.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-900/30 transition-colors text-slate-300">
                      <td className="px-6 py-4 font-semibold text-white">{project.title}</td>
                      <td className="px-6 py-4 text-sm font-mono">{project.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-mono border ${
                          project.type === 'client' 
                            ? 'bg-blue-950/40 border-blue-900/40 text-blue-400' 
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}>
                          {project.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono">{project.order_index}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id!)}
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

      {/* Add/Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold font-header text-white">
                {editingId ? 'Edit Project' : 'New Project'}
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
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Project Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Slug (URL Path)</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Niche / Category</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Luxury Dental UX"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={techStackText}
                    onChange={(e) => setTechStackText(e.target.value)}
                    placeholder="React, Site Audit, CRO"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Live URL</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2 flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="client">Client Work</option>
                      <option value="personal">Personal Work</option>
                    </select>
                  </div>
                  <div className="w-24 space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Order</label>
                    <input
                      type="number"
                      required
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Card Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Cover Mockup Image Section */}
              <div className="p-5 border border-slate-800 bg-slate-950/40 rounded-2xl space-y-4">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-widest block font-semibold">// Mockup Image (Supabase Storage)</label>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {imageUrl ? (
                    <div className="w-48 h-32 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shrink-0 relative group">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={imageUrl} target="_blank" rel="noreferrer" className="text-white p-2">
                          <Eye size={20} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-32 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 text-slate-600 font-mono text-xs">
                      No Image Chosen
                    </div>
                  )}
                  <div className="flex-1 space-y-2 w-full">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        id="image-file"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <label
                        htmlFor="image-file"
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 rounded-xl font-mono text-xs uppercase cursor-pointer text-slate-300 hover:text-white transition-colors"
                      >
                        <Upload size={14} /> 
                        {uploadingImage ? 'Uploading...' : 'Upload Mockup File'}
                      </label>
                    </div>
                    <p className="text-slate-500 text-xs font-mono leading-relaxed">
                      Saves directly to 'project-images' Supabase bucket. Recommended dimensions: 1200x800px.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Case Study Section */}
              <div className="space-y-6 pt-4 border-t border-slate-800/80">
                <h3 className="text-lg font-bold font-header text-blue-400">// Case Study Content</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Case Study Overview</label>
                  <textarea
                    rows={4}
                    value={csOverview}
                    onChange={(e) => setCsOverview(e.target.value)}
                    placeholder="Brief description about the context and background..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Challenges (1 per line)</label>
                    <textarea
                      rows={5}
                      value={csChallengesText}
                      onChange={(e) => setCsChallengesText(e.target.value)}
                      placeholder="Friction in funnel&#10;Slow page loading"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Solutions (1 per line)</label>
                    <textarea
                      rows={5}
                      value={csSolutionsText}
                      onChange={(e) => setCsSolutionsText(e.target.value)}
                      placeholder="Smart triage modal&#10;Edge asset cache"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Results (1 per line)</label>
                    <textarea
                      rows={5}
                      value={csResultsText}
                      onChange={(e) => setCsResultsText(e.target.value)}
                      placeholder="35% VIP lead boost&#10;Sub-second load times"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                    />
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
                  {submitting ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
