import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products, Category, CompanyType } from '../data/mockData';
import { Search, Filter, Star, BarChart3, Building2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedType, setSelectedType] = useState<CompanyType | 'All'>('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const types = ['All', ...Array.from(new Set(products.map(p => p.companyType)))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesType = selectedType === 'All' || p.companyType === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Product Directory</h1>
          <p className="text-slate-400 mt-2">Discover and analyze sentiment for Indian platforms.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6 shrink-0">
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
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/platform/${product.id}`}
                className="flex flex-col p-5 bg-slate-900 border border-white/5 rounded-xl hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <img src={product.logo} alt={product.name} className="w-12 h-12 rounded-lg bg-white" />
                  <div className="flex items-center gap-1 bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-md text-sm font-medium">
                    <Star className="h-3 w-3 fill-current" />
                    {product.overallScore}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">{product.name}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">{product.description}</p>
                
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-auto pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {product.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {product.marketBuzz.toLocaleString()} mentions
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-slate-900 border border-white/5 rounded-xl">
              <Search className="h-10 w-10 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">No products found</h3>
              <p className="text-slate-400 mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
