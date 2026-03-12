import { useState, useMemo } from 'react';
import { products, Category, CompanyType } from '../data/mockData';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Filter, Info, Map } from 'lucide-react';
import { cn } from '../utils/cn';

export default function LandscapeMap() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedType, setSelectedType] = useState<CompanyType | 'All'>('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const types = ['All', ...Array.from(new Set(products.map(p => p.companyType)))];

  const filteredData = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesType = selectedType === 'All' || p.companyType === selectedType;
      return matchesCategory && matchesType;
    }).map(p => ({
      id: p.id,
      name: p.name,
      x: p.overallScore,
      y: p.marketBuzz,
      category: p.category,
      type: p.companyType,
      topQuote: p.topPositiveMentions[0]?.content || p.topNegativeMentions[0]?.content || 'No quotes available'
    }));
  }, [selectedCategory, selectedType]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-white/10 p-4 rounded-xl shadow-xl max-w-xs">
          <h3 className="text-lg font-bold text-white mb-1">{data.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {data.category}
            </span>
            <span className="text-xs text-slate-400">{data.type}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Satisfaction</div>
              <div className="text-xl font-bold text-emerald-400">{data.x}/100</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Market Buzz</div>
              <div className="text-xl font-bold text-blue-400">{data.y.toLocaleString()}</div>
            </div>
          </div>
          <div className="pt-3 border-t border-white/10">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Top Quote</div>
            <p className="text-sm text-slate-300 italic line-clamp-3">"{data.topQuote}"</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Category Landscape Map</h1>
          <p className="text-slate-400 mt-2">Visualize the Indian market based on public sentiment and buzz.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 space-y-6 shrink-0">
          <div className="p-5 bg-slate-900 border border-white/5 rounded-xl space-y-6">
            <div className="flex items-center gap-2 text-white font-medium border-b border-white/10 pb-4">
              <Filter className="h-4 w-4" />
              Filters
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Category</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat as Category | 'All')}
                      className="text-indigo-500 focus:ring-indigo-500/50 bg-slate-800 border-white/10"
                    />
                    <span className={cn(
                      "text-sm transition-colors",
                      selectedCategory === cat ? "text-white font-medium" : "text-slate-400 group-hover:text-slate-300"
                    )}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Company Type</h3>
              <div className="space-y-2">
                {types.map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type as CompanyType | 'All')}
                      className="text-indigo-500 focus:ring-indigo-500/50 bg-slate-800 border-white/10"
                    />
                    <span className={cn(
                      "text-sm transition-colors",
                      selectedType === type ? "text-white font-medium" : "text-slate-400 group-hover:text-slate-300"
                    )}>
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-medium">
              <Info className="h-4 w-4" />
              How to read this map
            </div>
            <p className="text-sm text-indigo-200/70 leading-relaxed">
              The X-axis represents the overall sentiment score (0-100) derived from public conversations. The Y-axis represents the volume of mentions (buzz).
            </p>
            <ul className="text-sm text-indigo-200/70 space-y-2 list-disc pl-4">
              <li><strong>Top Right:</strong> High sentiment, high buzz (Leaders)</li>
              <li><strong>Bottom Right:</strong> High sentiment, low buzz (Niche/Emerging)</li>
              <li><strong>Top Left:</strong> Low sentiment, high buzz (Controversial/Monopoly)</li>
              <li><strong>Bottom Left:</strong> Low sentiment, low buzz (Struggling)</li>
            </ul>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 bg-slate-900 border border-white/5 rounded-2xl p-6 min-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Map className="h-5 w-5 text-indigo-400" />
              Sentiment vs Buzz
            </h2>
            <div className="text-sm text-slate-400">
              Showing {filteredData.length} platforms
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            {/* Quadrant Backgrounds */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none opacity-20">
              <div className="border-r border-b border-white/10 bg-rose-500/5"></div>
              <div className="border-b border-white/10 bg-emerald-500/5"></div>
              <div className="border-r border-white/10 bg-slate-500/5"></div>
              <div className="bg-blue-500/5"></div>
            </div>
            
            {/* Quadrant Labels */}
            <div className="absolute top-4 left-4 text-xs font-bold text-rose-500/50 uppercase tracking-widest pointer-events-none">Controversial</div>
            <div className="absolute top-4 right-4 text-xs font-bold text-emerald-500/50 uppercase tracking-widest pointer-events-none">Leaders</div>
            <div className="absolute bottom-12 left-4 text-xs font-bold text-slate-500/50 uppercase tracking-widest pointer-events-none">Struggling</div>
            <div className="absolute bottom-12 right-4 text-xs font-bold text-blue-500/50 uppercase tracking-widest pointer-events-none">Niche / Emerging</div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Sentiment Score" 
                  domain={[0, 100]} 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8' }}
                  label={{ value: 'User Satisfaction (Sentiment Score)', position: 'insideBottom', offset: -10, fill: '#94a3b8' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Market Buzz" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8' }}
                  tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  label={{ value: 'Market Buzz (Mentions)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Platforms" data={filteredData}>
                  {filteredData.map((entry, index) => {
                    // Color based on category or sentiment
                    const color = entry.x >= 70 ? '#34d399' : entry.x >= 50 ? '#60a5fa' : '#fb7185';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
