import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Trash2, Plus, AlertCircle, RefreshCw } from 'lucide-react';

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
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleSave = async (index: number) => {
    const faq = faqs[index];
    const tempId = faq.id;
    setSavingId(tempId || 'new');

    try {
      if (tempId && !tempId.startsWith('new-')) {
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
        
        // Refresh FAQ state list
        if (data && data[0]) {
          const updated = [...faqs];
          updated[index] = data[0];
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
    const faq = faqs[index];
    const id = faq.id;

    if (!confirm('Are you sure you want to delete this FAQ item?')) return;

    if (id && !id.startsWith('new-')) {
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

    const updated = faqs.filter((_, idx) => idx !== index);
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

  if (loading || error) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-slate-900 rounded-xl" />
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-900 rounded-3xl" />
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2">FAQs</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">// Inline list editor</p>
        </div>
        <button
          onClick={handleAddFaq}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-sm tracking-wider uppercase transition-colors"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="space-y-6">
        {faqs.length === 0 ? (
          <div className="p-10 text-center text-slate-500 font-mono border border-slate-800 bg-slate-900/10 rounded-3xl">
            // No FAQ items found. Click 'Add Item' to create one.
          </div>
        ) : (
          faqs.map((faq, index) => {
            const isSaving = savingId === faq.id || (savingId === 'new' && faq.id?.toString().startsWith('new-'));
            return (
              <div 
                key={faq.id}
                className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 hover:border-slate-700/80 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {/* Order Index */}
                  <div className="w-full md:w-20 space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase block tracking-wider">Order</label>
                    <input
                      type="number"
                      value={faq.order_index}
                      onChange={(e) => handleFieldChange(index, 'order_index', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-center font-mono text-sm"
                    />
                  </div>

                  {/* Question Field */}
                  <div className="flex-1 w-full space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase block tracking-wider">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFieldChange(index, 'question', e.target.value)}
                      placeholder="Enter the question query..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                    />
                  </div>

                  {/* Individual Item Actions */}
                  <div className="flex md:flex-col gap-2 self-end md:self-start md:mt-6 shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => handleSave(index)}
                      disabled={isSaving}
                      className="flex-1 md:w-10 md:h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white flex items-center justify-center gap-2 p-3 transition-colors text-xs font-mono uppercase tracking-wider md:text-sm"
                      title="Save FAQ Item"
                    >
                      <Save size={16} />
                      <span className="md:hidden">Save</span>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      disabled={isSaving}
                      className="flex-1 md:w-10 md:h-10 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-900/50 hover:text-red-400 text-slate-400 flex items-center justify-center gap-2 p-3 transition-colors text-xs font-mono uppercase tracking-wider md:text-sm"
                      title="Delete FAQ Item"
                    >
                      <Trash2 size={16} />
                      <span className="md:hidden">Delete</span>
                    </button>
                  </div>
                </div>

                {/* Answer Field */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase block tracking-wider">Answer Content</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => handleFieldChange(index, 'answer', e.target.value)}
                    placeholder="Enter the FAQ answer text..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 leading-relaxed"
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
