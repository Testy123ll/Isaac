import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Upload, Eye, EyeOff, Bold, Italic, List, ListOrdered, Heading, AlertCircle, RefreshCw } from 'lucide-react';
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
    <div className="flex flex-wrap gap-1 p-2 bg-slate-900 border border-b-0 border-slate-800 rounded-t-xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${editor.isActive('bold') ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${editor.isActive('italic') ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
      >
        <Heading size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
      >
        <ListOrdered size={16} />
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
        class: 'focus:outline-none bg-slate-950 border border-slate-800 rounded-b-xl p-4 min-h-[200px] text-slate-300 leading-relaxed font-sans text-sm outline-none max-w-full overflow-y-auto',
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
      // Clear before setting
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2">Blog Articles</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">// Technical notes & thoughts</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-sm tracking-wider uppercase transition-colors"
        >
          <Plus size={16} /> New Article
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
          <button onClick={fetchPosts} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors">
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
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500 font-mono">
                      // No blog posts found. Write your first article.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{post.title}</td>
                      <td className="px-6 py-4 text-sm font-mono">{post.category}</td>
                      <td className="px-6 py-4 text-sm font-mono">{post.date}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
                            post.published 
                              ? 'bg-green-950/40 border-green-900/40 text-green-400 hover:bg-green-900/20' 
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/20'
                          }`}
                        >
                          {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{post.published ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id!)}
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
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold font-header text-white">
                {editingId ? 'Edit Article' : 'New Article'}
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
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Category</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Architecture"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Read Time</label>
                    <input
                      type="text"
                      required
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Published Date</label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short summary for the listing page..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Cover Image Section */}
              <div className="p-5 border border-slate-800 bg-slate-950/40 rounded-2xl space-y-4">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-widest block font-semibold">// Cover Image (Supabase Storage)</label>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {imageUrl ? (
                    <div className="w-48 h-28 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shrink-0 relative group">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={imageUrl} target="_blank" rel="noreferrer" className="text-white p-2">
                          <Eye size={20} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-28 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 text-slate-600 font-mono text-xs">
                      No Image Chosen
                    </div>
                  )}
                  <div className="flex-1 space-y-2 w-full">
                    <div className="relative">
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
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 rounded-xl font-mono text-xs uppercase cursor-pointer text-slate-300 hover:text-white transition-colors"
                      >
                        <Upload size={14} /> 
                        {uploadingImage ? 'Uploading...' : 'Upload Cover File'}
                      </label>
                    </div>
                    <p className="text-slate-500 text-xs font-mono leading-relaxed">
                      Saves directly to 'blog-images' bucket. Dimensions: 1600x900px.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Article Content</label>
                <div className="flex flex-col">
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publish-toggle"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 focus:ring-blue-500"
                />
                <label htmlFor="publish-toggle" className="text-sm font-semibold text-slate-300 cursor-pointer select-none">
                  Publish article immediately (Visible on website)
                </label>
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
