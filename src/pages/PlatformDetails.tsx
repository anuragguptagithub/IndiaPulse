import { useParams, Link } from 'react-router-dom';
import { products, Mention } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowLeft, ExternalLink, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, Building2, Calendar, MapPin, Globe } from 'lucide-react';
import { cn } from '../utils/cn';

export default function PlatformDetails() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Platform not found</h2>
        <Link to="/directory" className="text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Link>
      </div>
    );
  }

  const getSentimentColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'bg-blue-500/10 border-blue-500/20';
    if (score >= 40) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-rose-500/10 border-rose-500/20';
  };

  const renderMention = (mention: Mention, type: 'positive' | 'negative') => (
    <div key={mention.id} className="p-5 rounded-xl bg-slate-900 border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{mention.username}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">
            {mention.platform}
          </span>
        </div>
        <span className="text-slate-500 text-xs">{new Date(mention.timestamp).toLocaleDateString()}</span>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">"{mention.content}"</p>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-1 text-slate-400 text-sm">
          <ThumbsUp className="h-4 w-4" />
          <span>{mention.likes.toLocaleString()}</span>
        </div>
        <a href={mention.link} className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center gap-1">
          View Original <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Link to="/directory" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Directory
      </Link>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between p-6 rounded-2xl bg-slate-900 border border-white/10">
        <div className="flex items-start gap-6">
          <img src={product.logo} alt={product.name} className="w-24 h-24 rounded-xl bg-white shadow-lg" />
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">{product.name}</h1>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-slate-300 border border-white/10">
                {product.category}
              </span>
            </div>
            <p className="text-slate-400 max-w-2xl">{product.description}</p>
            
            <div className="flex flex-wrap gap-4 pt-4 text-sm text-slate-400">
              <div className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {product.companyType}</div>
              <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {product.headquarters}</div>
              <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Est. {product.launchYear}</div>
              <a href={product.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300">
                <Globe className="h-4 w-4" /> Website
              </a>
            </div>
          </div>
        </div>

        <div className={cn("shrink-0 flex flex-col items-center justify-center p-6 rounded-xl border", getSentimentBg(product.overallScore))}>
          <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Sentiment Score</div>
          <div className={cn("text-5xl font-bold tracking-tighter", getSentimentColor(product.overallScore))}>
            {product.overallScore}
          </div>
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <MessageSquare className="h-3 w-3" /> {product.marketBuzz.toLocaleString()} mentions
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts & Breakdown */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trend Chart */}
          <section className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">12-Month Sentiment Trend</h2>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={product.trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: '#818cf8', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Platform Breakdown */}
          <section className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-6">
            <h2 className="text-xl font-semibold text-white">Platform Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.platformBreakdown.map((platform) => (
                <div key={platform.source} className="p-4 rounded-xl bg-slate-950 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-slate-300">{platform.source}</span>
                    <span className={cn("text-lg font-bold", getSentimentColor(platform.score))}>
                      {platform.score}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3">
                    <div 
                      className={cn("h-1.5 rounded-full", platform.score >= 50 ? "bg-indigo-500" : "bg-rose-500")} 
                      style={{ width: `${platform.score}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{platform.mentions.toLocaleString()} mentions</span>
                    <span>{platform.engagement.toLocaleString()} eng.</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mentions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <ThumbsUp className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Top Positive Mentions</h2>
              </div>
              <div className="space-y-4">
                {product.topPositiveMentions.map(m => renderMention(m, 'positive'))}
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-rose-400">
                <ThumbsDown className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Top Negative Mentions</h2>
              </div>
              <div className="space-y-4">
                {product.topNegativeMentions.map(m => renderMention(m, 'negative'))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column - Pros/Cons & Info */}
        <div className="space-y-8">
          <section className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-6">
            <h2 className="text-lg font-semibold text-white">Summary</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" /> Pros
                </h3>
                <ul className="space-y-2">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm font-medium text-rose-400 mb-2 flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4" /> Cons
                </h3>
                <ul className="space-y-2">
                  {product.cons.map((con, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-6">
            <h2 className="text-lg font-semibold text-white">Trending Topics</h2>
            <div className="flex flex-wrap gap-2">
              {product.trendingTopics.map((topic, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 text-sm border border-indigo-500/20">
                  #{topic}
                </span>
              ))}
            </div>
          </section>
          
          <section className="p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-6">
            <h2 className="text-lg font-semibold text-white">User Segments</h2>
            <div className="space-y-3">
              {product.userSegments.map((segment, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-white/5">
                  <span className="text-sm text-slate-300">{segment}</span>
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
