import { Link } from 'react-router-dom';
import { trendingProducts, viralConversations } from '../data/mockData';
import { ArrowUpRight, ArrowDownRight, MessageSquare, ThumbsUp, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Unbiased Sentiment Intelligence <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            for the Indian Ecosystem
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          We aggregate organic user sentiment from public internet conversations across X, Reddit, LinkedIn, and more, giving you a clearer picture of what real users think about Indian startups, government services, and consumer apps.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/directory" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
            Explore Directory
          </Link>
          <Link to="/landscape" className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
            View Landscape Map
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-indigo-400" />
            <h2 className="text-2xl font-semibold text-white">Trending in India</h2>
          </div>
          <p className="text-slate-400 text-sm">Products and services with the biggest sentiment shifts in the last 30 days.</p>
          
          <div className="space-y-4">
            {trendingProducts.map((product) => {
              const isPositive = product.sentimentShift30Days > 0;
              return (
                <Link 
                  key={product.id} 
                  to={`/platform/${product.id}`}
                  className="block p-5 rounded-xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={product.logo} alt={product.name} className="w-12 h-12 rounded-lg" />
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                        <p className="text-sm text-slate-400">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{product.overallScore}</div>
                      <div className={cn(
                        "flex items-center justify-end text-sm font-medium",
                        isPositive ? "text-emerald-400" : "text-rose-400"
                      )}>
                        {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                        {Math.abs(product.sentimentShift30Days)} pts
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Viral Conversations Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-semibold text-white">Viral Conversations</h2>
          </div>
          <p className="text-slate-400 text-sm">The most viral posts about Indian platforms from across sources.</p>
          
          <div className="space-y-4">
            {viralConversations.map((mention) => (
              <div key={mention.id} className="p-5 rounded-xl bg-slate-900 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{mention.username}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">
                      {mention.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(mention.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  "{mention.content}"
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{mention.likes.toLocaleString()}</span>
                  </div>
                  <div className={cn(
                    "text-xs font-medium px-2 py-1 rounded-md",
                    mention.sentiment === 'positive' ? "bg-emerald-500/10 text-emerald-400" :
                    mention.sentiment === 'negative' ? "bg-rose-500/10 text-rose-400" :
                    "bg-slate-500/10 text-slate-400"
                  )}>
                    {mention.sentiment.charAt(0).toUpperCase() + mention.sentiment.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
