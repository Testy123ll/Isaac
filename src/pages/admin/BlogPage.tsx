import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Upload, Bold, Italic, List, ListOrdered, Heading, AlertCircle, RefreshCw, FileText, Calendar } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content: string;
  published: boolean;
}

// Rich Text Menu Bar Component
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2.5 bg-slate-950 border border-slate-800 rounded-t-2xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider hover:bg-slate-900 border transition-all duration-200 cursor-pointer ${editor.isActive('bold') ? 'bg-purple-950/40 border-purple-500/30 text-purple-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
      >
        <Bold size={14} className="inline mr-1" /> Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider hover:bg-slate-900 border transition-all duration-200 cursor-pointer ${editor.isActive('italic') ? 'bg-purple-950/40 border-purple-500/30 text-purple-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
      >
        <Italic size={14} className="inline mr-1" /> Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider hover:bg-slate-900 border transition-all duration-200 cursor-pointer ${editor.isActive('heading', { level: 2 }) ? 'bg-purple-950/40 border-purple-500/30 text-purple-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
      >
        <Heading size={14} className="inline mr-1" /> Header
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider hover:bg-slate-900 border transition-all duration-200 cursor-pointer ${editor.isActive('bulletList') ? 'bg-purple-950/40 border-purple-500/30 text-purple-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
      >
        <List size={14} className="inline mr-1" /> Bullets
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider hover:bg-slate-900 border transition-all duration-200 cursor-pointer ${editor.isActive('orderedList') ? 'bg-purple-950/40 border-purple-500/30 text-purple-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
      >
        <ListOrdered size={14} className="inline mr-1" /> Numbers
      </button>
    </div>
  );
};

export const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  // Tiptap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none bg-slate-950/60 border border-slate-800 rounded-b-2xl p-5 min-h-[260px] text-slate-300 leading-relaxed font-sans text-sm outline-none max-w-full overflow-y-auto',
      },
    },
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      console.error('Failed to fetch blog posts:', err);
      setError(err.message || 'Failed to load blog posts from database.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setExcerpt('');
    setCategory('');
    setReadTime('');
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setImageUrl('');
    setPublished(false);
    setEditingId(null);
    if (editor) {
      editor.commands.setContent('');
    }
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
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Check if blog-images bucket is public.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id || null);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setCategory(post.category);
    setReadTime(post.readTime);
    setDate(post.date);
    setImageUrl(post.imageUrl);
    setPublished(post.published);
    
    if (editor) {
      editor.commands.setContent(post.content || '');
    }

    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog article?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
    } catch (err) {
      console.error('Failed to delete blog post:', err);
      alert('Delete failed');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;
      fetchPosts();
    } catch (err) {
      console.error('Failed to update publish status:', err);
      alert('Update failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const contentHtml = editor ? editor.getHTML() : '';

    const postData = {
      title,
      slug,
      excerpt,
      category,
      readTime,
      date,
      imageUrl,
      content: contentHtml,
      published,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        if (error) throw error;
      }
      setFormOpen(false);
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error('Failed to save blog post:', err);
      alert('Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2 tracking-tight">Technical Publications</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">// Manage articles & notes</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Plus size={15} /> New Publication
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
          <button onClick={fetchPosts} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer">
            <RefreshCw size={14} /> Retry Query
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-500 font-mono text-xs uppercase tracking-widest bg-slate-950/20">
                  <th className="px-6 py-4.5">Publication</th>
                  <th className="px-6 py-4.5">Niche Naming</th>
                  <th className="px-6 py-4.5">Stamp Date</th>
                  <th className="px-6 py-4.5">Status Check</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-sans text-slate-300">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-600 font-mono text-xs uppercase tracking-wider">
                      // Publications queue is empty. Write an article.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg bg-slate-950 border border-slate-800/80 overflow-hidden shrink-0 shadow-inner">
                            {post.imageUrl ? (
                              <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-slate-900/60 flex items-center justify-center text-[8px] text-slate-600 font-mono uppercase">N/A</div>
                            )}
                          </div>
                          <span className="font-semibold text-white truncate max-w-[200px]">{post.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono">{post.category}</td>
                      <td className="px-6 py-4 text-xs font-mono">{post.date}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border transition-all duration-200 cursor-pointer ${
                            post.published 
                              ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/10' 
                              : 'bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-900/30'
                          }`}
                        >
                          {post.published ? (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          )}
                          <span>{post.published ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-slate-500 hover:text-white hover:bg-slate-900/60 border border-transparent hover:border-slate-800 rounded-xl transition-all cursor-pointer"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id!)}
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
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800/80 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-slate-800/60 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold font-header text-white tracking-wide">
                {editingId ? 'Edit Article block' : 'Write Technical Article'}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8 flex-1">
              
              {/* Form Grid: Group 1 (Basic Parameters) */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                  <FileText size={14} /> // Core Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Article Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Traditional Coding vs WordPress"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Slug Path</label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="slug-path"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Category</label>
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Architecture"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Estimated Read Time</label>
                    <input
                      type="text"
                      required
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white text-center focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Publication Stamp Date</label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white text-center focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt Section */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Listing Page Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short summarizing abstract for the catalog list..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                />
              </div>

              {/* Cover File Dropzone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Cover Photo Image</label>
                <div className="p-6 border border-dashed border-slate-800 bg-slate-950/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                  <input
                    type="file"
                    accept="image/*"
                    id="blog-image-file"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="blog-image-file"
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer text-center py-4"
                  >
                    {imageUrl ? (
                      <div className="relative w-full max-w-[240px] aspect-video rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg shadow-black/40">
                        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[10px] text-white font-mono uppercase tracking-wider">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-400 transition-colors shadow-inner">
                          <Upload size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-200 block">Click to upload cover illustration file</span>
                          <span className="text-[10px] font-mono text-slate-500 block uppercase mt-1">Accepts PNG/JPG/WebP · max 5MB</span>
                        </div>
                      </>
                    )}
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-slate-300">Uploading File Assets...</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-3 pt-4 border-t border-slate-800/40">
                <label className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold block flex items-center gap-2">
                  <Calendar size={14} /> // Editor Content
                </label>
                <div className="flex flex-col">
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-800/60 p-4 rounded-2xl max-w-max select-none">
                <input
                  type="checkbox"
                  id="publish-toggle"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-purple-600 focus:ring-purple-500/20"
                />
                <label htmlFor="publish-toggle" className="text-xs font-mono uppercase tracking-wider text-slate-400 cursor-pointer select-none">
                  Publish article immediately (Visible on website)
                </label>
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
                  {submitting ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
