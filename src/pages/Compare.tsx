import { useState } from 'react';
import { products, Product } from '../data/mockData';
import { Search, X, Plus, GitCompare, Check, Minus } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const selectedProducts = selectedIds.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
    setSearchQuery('');
    setIsSearching(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedIds.includes(p.id)
  );

  const getSentimentColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Side-by-Side Comparison</h1>
        <p className="text-slate-400 mt-2">Compare up to 3 platforms based on public sentiment, pros, cons, and more.</p>
      </div>

      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => {
          const product = selectedProducts[index];
          
          if (product) {
            return (
              <div key={product.id} className="relative p-4 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center gap-4">
                <img src={product.logo} alt={product.name} className="w-12 h-12 rounded-lg bg-white" />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{product.name}</h3>
                  <p className="text-xs text-slate-400">{product.category}</p>
                </div>
                <button 
                  onClick={() => handleSelect(product.id)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-800 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          }

          if (index === selectedProducts.length) {
            return (
              <div key={`empty-${index}`} className="relative">
                {isSearching ? (
                  <div className="absolute inset-0 z-10 bg-slate-900 border border-indigo-500/50 rounded-xl overflow-hidden flex flex-col shadow-2xl">
                    <div className="p-2 border-b border-white/10 flex items-center gap-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder="Search product..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-slate-500"
                      />
                      <button onClick={() => setIsSearching(false)} className="p-1 text-slate-400 hover:text-white">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-48 p-2 space-y-1">
                      {filteredProducts.slice(0, 10).map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleSelect(p.id)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 text-left transition-colors"
                        >
                          <img src={p.logo} alt={p.name} className="w-6 h-6 rounded bg-white" />
                          <span className="text-sm text-white">{p.name}</span>
                        </button>
                      ))}
                      {filteredProducts.length === 0 && (
                        <div className="p-4 text-center text-sm text-slate-500">No products found</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsSearching(true)}
                    className="w-full h-full min-h-[80px] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="text-sm font-medium">Add to compare</span>
                  </button>
                )}
              </div>
            );
          }

          return (
            <div key={`empty-${index}`} className="w-full h-full min-h-[80px] border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-slate-600">
              <span className="text-sm">Select another</span>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      {selectedProducts.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-white/10 bg-slate-950/50 w-48 shrink-0">Feature</th>
                {selectedProducts.map(p => (
                  <th key={`th-${p.id}`} className="p-4 border-b border-l border-white/10 bg-slate-950/50 min-w-[250px]">
                    <div className="flex items-center gap-3">
                      <img src={p.logo} alt={p.name} className="w-8 h-8 rounded bg-white" />
                      <span className="font-bold text-white">{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Sentiment Score */}
              <tr>
                <td className="p-4 border-b border-white/5 font-medium text-slate-300">Overall Sentiment</td>
                {selectedProducts.map(p => (
                  <td key={`score-${p.id}`} className="p-4 border-b border-l border-white/5">
                    <div className={cn("text-3xl font-bold", getSentimentColor(p.overallScore))}>
                      {p.overallScore}
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Market Buzz */}
              <tr>
                <td className="p-4 border-b border-white/5 font-medium text-slate-300">Market Buzz</td>
                {selectedProducts.map(p => (
                  <td key={`buzz-${p.id}`} className="p-4 border-b border-l border-white/5 text-slate-300">
                    {p.marketBuzz.toLocaleString()} mentions
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr>
                <td className="p-4 border-b border-white/5 font-medium text-slate-300">Category</td>
                {selectedProducts.map(p => (
                  <td key={`cat-${p.id}`} className="p-4 border-b border-l border-white/5 text-slate-300">
                    {p.category}
                  </td>
                ))}
              </tr>

              {/* Pricing */}
              <tr>
                <td className="p-4 border-b border-white/5 font-medium text-slate-300">Pricing Tier</td>
                {selectedProducts.map(p => (
                  <td key={`price-${p.id}`} className="p-4 border-b border-l border-white/5 text-slate-300">
                    {p.pricingTier}
                  </td>
                ))}
              </tr>

              {/* Pros */}
              <tr>
                <td className="p-4 border-b border-white/5 font-medium text-slate-300 align-top">Top Pros</td>
                {selectedProducts.map(p => (
                  <td key={`pros-${p.id}`} className="p-4 border-b border-l border-white/5 align-top">
                    <ul className="space-y-2">
                      {p.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Cons */}
              <tr>
                <td className="p-4 border-b border-white/5 font-medium text-slate-300 align-top">Top Cons</td>
                {selectedProducts.map(p => (
                  <td key={`cons-${p.id}`} className="p-4 border-b border-l border-white/5 align-top">
                    <ul className="space-y-2">
                      {p.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <Minus className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Trending Topics */}
              <tr>
                <td className="p-4 border-b border-white/5 font-medium text-slate-300 align-top">Trending Topics</td>
                {selectedProducts.map(p => (
                  <td key={`topics-${p.id}`} className="p-4 border-b border-l border-white/5 align-top">
                    <div className="flex flex-wrap gap-2">
                      {p.trendingTopics.map((topic, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* User Segments */}
              <tr>
                <td className="p-4 border-white/5 font-medium text-slate-300 align-top">User Segments</td>
                {selectedProducts.map(p => (
                  <td key={`segments-${p.id}`} className="p-4 border-l border-white/5 align-top">
                    <div className="flex flex-wrap gap-2">
                      {p.userSegments.map((segment, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs border border-white/5">
                          {segment}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900 border border-white/5 rounded-2xl">
          <GitCompare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-white">No platforms selected</h2>
          <p className="text-slate-400 mt-2">Select up to 3 platforms above to compare their public sentiment.</p>
        </div>
      )}
    </div>
  );
}
