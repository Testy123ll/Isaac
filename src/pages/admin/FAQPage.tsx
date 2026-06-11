import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Trash2, Plus, AlertCircle, RefreshCw, ChevronUp, ChevronDown, Search, HelpCircle } from 'lucide-react';

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  order_index: number;
}

export const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (err: any) {
      console.error('Failed to fetch FAQs:', err);
      setError(err.message || 'Failed to load FAQs from database.');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (index: number, field: 'question' | 'answer' | 'order_index', value: any) => {
    const faq = filteredFaqs[index];
    const actualIndex = faqs.findIndex(f => f.id === faq.id);
    if (actualIndex === -1) return;

    const updated = [...faqs];
    updated[actualIndex] = { ...updated[actualIndex], [field]: value };
    setFaqs(updated);
  };

  const handleSave = async (index: number) => {
    const faq = filteredFaqs[index];
    const actualIndex = faqs.findIndex(f => f.id === faq.id);
    if (actualIndex === -1) return;

    const tempId = faq.id;
    setSavingId(tempId || 'new');

    try {
      if (tempId && !tempId.toString().startsWith('new-')) {
        // Update
        const { error } = await supabase
          .from('faqs')
          .update({
            question: faq.question,
            answer: faq.answer,
            order_index: Number(faq.order_index),
          })
          .eq('id', tempId);

        if (error) throw error;
        alert('FAQ item updated!');
      } else {
        // Insert
        const { data, error } = await supabase
          .from('faqs')
          .insert([{
            question: faq.question,
            answer: faq.answer,
            order_index: Number(faq.order_index),
          }])
          .select();

        if (error) throw error;
        
        if (data && data[0]) {
          const updated = [...faqs];
          updated[actualIndex] = data[0];
          setFaqs(updated);
        }
        alert('New FAQ item added successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save FAQ item.');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (index: number) => {
    const faq = filteredFaqs[index];
    const actualIndex = faqs.findIndex(f => f.id === faq.id);
    if (actualIndex === -1) return;

    const id = faq.id;

    if (!confirm('Are you sure you want to delete this FAQ item?')) return;

    if (id && !id.toString().startsWith('new-')) {
      try {
        const { error } = await supabase
          .from('faqs')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (err) {
        console.error(err);
        alert('Delete failed');
        return;
      }
    }

    const updated = faqs.filter((_, idx) => idx !== actualIndex);
    setFaqs(updated);
  };

  const handleAddFaq = () => {
    const newFaq: FAQ = {
      id: `new-${Date.now()}`,
      question: '',
      answer: '',
      order_index: faqs.length > 0 ? Math.max(...faqs.map(f => f.order_index)) + 1 : 0
    };
    setFaqs([...faqs, newFaq]);
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const faqToMove = filteredFaqs[index];
    const actualIndex = faqs.findIndex(f => f.id === faqToMove.id);
    if (actualIndex === -1) return;

    if (direction === 'up' && actualIndex === 0) return;
    if (direction === 'down' && actualIndex === faqs.length - 1) return;

    const targetIndex = direction === 'up' ? actualIndex - 1 : actualIndex + 1;
    const updated = [...faqs];
    
    // Swap order_index
    const tempOrder = updated[actualIndex].order_index;
    updated[actualIndex].order_index = updated[targetIndex].order_index;
    updated[targetIndex].order_index = tempOrder;

    // Swap elements in the array
    const temp = updated[actualIndex];
    updated[actualIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Sort the list based on the new order indices to keep it consistent
    updated.sort((a, b) => a.order_index - b.order_index);

    setFaqs(updated);

    // Save changes to database
    try {
      if (temp.id && !temp.id.toString().startsWith('new-')) {
        await supabase.from('faqs').update({ order_index: temp.order_index }).eq('id', temp.id);
      }
      
      const otherItem = updated[targetIndex];
      if (otherItem && otherItem.id && !otherItem.id.toString().startsWith('new-')) {
        await supabase.from('faqs').update({ order_index: otherItem.order_index }).eq('id', otherItem.id);
      }
    } catch (err) {
      console.error('Failed to save reordered items:', err);
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canReorder = searchTerm === '';

  if (loading || error) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <div className="h-10 w-48 bg-slate-900 rounded-xl" />
            <div className="h-4 w-32 bg-slate-900 rounded-md" />
          </div>
          <div className="h-12 w-36 bg-slate-900 rounded-xl" />
        </div>
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-900/40 border border-slate-800/80 rounded-3xl" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <AlertCircle className="text-red-400" size={28} />
            <p className="text-red-400 font-mono text-sm text-center max-w-sm">{error}</p>
            <button onClick={fetchFaqs} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors">
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold font-header text-white">FAQs</h1>
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
              {faqs.length} Total
            </span>
          </div>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">// Manage frequently asked questions and answers</p>
        </div>
        <button
          onClick={handleAddFaq}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer shadow-lg shadow-purple-500/10"
        >
          <Plus size={16} /> Add FAQ Item
        </button>
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search FAQs by question or answer keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-900/20 backdrop-blur-md border border-slate-800/80 rounded-2xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all placeholder-slate-500"
        />
      </div>

      {/* FAQ Cards List */}
      <div className="space-y-6">
        {filteredFaqs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center text-slate-500 font-mono border border-dashed border-slate-800 bg-slate-900/10 rounded-[2rem] gap-3">
            <HelpCircle size={32} className="text-slate-600" />
            <span>
              {searchTerm 
                ? `// No FAQ items match "${searchTerm}"` 
                : "// No FAQ items found. Click 'Add FAQ Item' to get started."}
            </span>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isSaving = savingId === faq.id || (savingId === 'new' && faq.id?.toString().startsWith('new-'));
            const isDraft = faq.id?.toString().startsWith('new-');
            
            return (
              <div 
                key={faq.id}
                className={`relative overflow-hidden bg-slate-900/20 backdrop-blur-md border ${
                  isDraft ? 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.02)]' : 'border-slate-800/80'
                } rounded-[2rem] p-6 md:p-8 space-y-6 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.03)] transition-all duration-300 group shadow-lg shadow-black/20`}
              >
                {/* Glowing Side Indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDraft ? 'bg-gradient-to-b from-amber-500 to-orange-500' : 'bg-gradient-to-b from-purple-500 to-indigo-500'
                }`} />

                {/* Card Header Section */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Left Column: Number badge + Reorder controls */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`w-10 h-10 rounded-xl bg-slate-950 border ${
                      isDraft ? 'border-amber-500/20 text-amber-400' : 'border-slate-800 text-purple-400'
                    } flex items-center justify-center font-mono font-bold text-sm shadow-inner group-hover:border-purple-500/40 transition-colors`}>
                      {isDraft ? '*' : `#${index + 1}`}
                    </div>

                    {/* Reorder Buttons (Only enabled when not filtering) */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveItem(index, 'up')}
                        disabled={!canReorder || index === 0 || isSaving}
                        className="p-1.5 rounded-lg border border-slate-800/80 bg-slate-950/40 hover:bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                        title={canReorder ? "Move FAQ Up" : "Reordering disabled during search"}
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => moveItem(index, 'down')}
                        disabled={!canReorder || index === filteredFaqs.length - 1 || isSaving}
                        className="p-1.5 rounded-lg border border-slate-800/80 bg-slate-950/40 hover:bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                        title={canReorder ? "Move FAQ Down" : "Reordering disabled during search"}
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Middle: Question Field */}
                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Question</label>
                      {isDraft && (
                        <span className="px-2 py-0.5 text-[8px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full uppercase animate-pulse">
                          Unsaved Draft
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFieldChange(index, 'question', e.target.value)}
                      placeholder="e.g. What is your development lifecycle duration?"
                      className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-white font-semibold focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all placeholder-slate-600"
                    />
                  </div>

                  {/* Right: Order Index Input */}
                  <div className="w-full lg:w-20 space-y-1.5 shrink-0">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Sort Order</label>
                    <input
                      type="number"
                      value={faq.order_index}
                      onChange={(e) => handleFieldChange(index, 'order_index', Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-white text-center font-mono text-sm focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  {/* Actions Area */}
                  <div className="flex lg:flex-col gap-2 self-end lg:self-start lg:mt-[22px] shrink-0 w-full lg:w-auto">
                    <button
                      onClick={() => handleSave(index)}
                      disabled={isSaving || !faq.question.trim() || !faq.answer.trim()}
                      className="flex-1 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white flex items-center justify-center gap-2 p-3 transition-all cursor-pointer text-xs font-mono uppercase tracking-wider lg:text-sm shadow-md shadow-purple-500/5"
                      title="Save FAQ Item"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      <span className="lg:hidden">{isSaving ? 'Saving...' : 'Save Item'}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      disabled={isSaving}
                      className="flex-1 lg:w-10 lg:h-10 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-900/50 hover:text-red-400 text-slate-400 flex items-center justify-center gap-2 p-3 transition-colors text-xs font-mono uppercase tracking-wider lg:text-sm"
                      title="Delete FAQ Item"
                    >
                      <Trash2 size={16} />
                      <span className="lg:hidden">Delete Item</span>
                    </button>
                  </div>
                </div>

                {/* Answer Field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Answer Content</label>
                  <textarea
                    rows={4}
                    value={faq.answer}
                    onChange={(e) => handleFieldChange(index, 'answer', e.target.value)}
                    placeholder="Provide a comprehensive answer description..."
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-slate-300 leading-relaxed focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all placeholder-slate-600"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
