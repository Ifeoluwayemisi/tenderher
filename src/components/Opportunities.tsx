import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { Opportunity } from '../types';
import {
  Search,
  MapPin,
  Calendar,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
} from 'lucide-react';

interface OpportunitiesProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
}

export const Opportunities: React.FC<OpportunitiesProps> = ({
  opportunities,
  onSelectOpportunity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'closingSoon'>('all');

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.refCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === 'closingSoon' ? opp.closingSoon : true;

    return matchesSearch && matchesFilter;
  });

  const closingSoonCount = opportunities.filter((o) => o.closingSoon).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-6xl mx-auto w-full flex flex-col gap-6"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Assessed Catalog
            </span>
            <span className="text-xs text-slate-500">• Synced with Nigeria e-Procurement Portals</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Procurement Opportunities
          </h1>
          <p className="text-xs text-slate-600">
            Opportunities discovered and assessed for your business profile.
          </p>
        </div>

        {/* Counter Pill */}
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-2 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>
            <strong className="text-emerald-700 font-extrabold">{filteredOpportunities.length}</strong> opportunities found
          </span>
        </div>
      </div>

      {/* Search Bar & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveFilter('closingSoon')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeFilter === 'closingSoon'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Closing soon ({closingSoonCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search opportunities..."
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Grid of Opportunity Cards (2x2) */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-slate-700">No matching tenders found</p>
          <p className="text-xs text-slate-500">Try adjusting your search keywords or filter settings.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
            }}
            className="mt-2 text-xs font-semibold text-emerald-700 hover:underline"
          >
            Reset search & filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpportunities.map((opp) => (
            <motion.div
              key={opp.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Header with Category Badge */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-800/90 text-white px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                      {opp.category}
                    </span>

                    {opp.closingSoon && (
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        CLOSING SOON
                      </span>
                    )}
                  </div>

                  {/* Ref Code on Image Bottom */}
                  <div className="absolute bottom-2.5 left-3 text-[10px] text-slate-200 font-mono tracking-tight bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    REF: {opp.refCode}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    SOURCE: {opp.source}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-emerald-700 transition-colors cursor-pointer"
                      onClick={() => onSelectOpportunity(opp)}
                  >
                    {opp.title}
                  </h3>

                  <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{opp.ministry}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.location}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Deadline: {opp.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Compatibility Badges & Action Button */}
              <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Compatibility Badges */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {opp.matchesCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {opp.matchesCount} matches
                    </span>
                  )}

                  {opp.potentialGapsCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      {opp.potentialGapsCount} potential gap{opp.potentialGapsCount > 1 ? 's' : ''}
                    </span>
                  )}

                  {opp.toVerifyCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold">
                      <HelpCircle className="w-3 h-3 text-slate-500" />
                      {opp.toVerifyCount} to verify
                    </span>
                  )}
                </div>

                {/* View Intelligence CTA */}
                <button
                  onClick={() => onSelectOpportunity(opp)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all shrink-0"
                >
                  <span>View intelligence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center py-4 border-t border-slate-200 text-xs text-slate-500">
        Opportunities undergo real-time official match & BPP Nigeria compliance checks. Last catalog sync: Today, 08:30 AM WAT
      </div>
    </motion.div>
  );
};
