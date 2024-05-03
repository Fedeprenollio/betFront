import { create } from 'zustand'
import createTeamStore from "./teamStore";
import createMatchesStore from "./matchesStore";
import createTeamStatsStore from "./statsStore";
import createSeasonStore from "./seasonStore";
import crateLeagueStore from "./leagueStore";
import createUserStore from './userStore';

// Combina ambos slices en un solo store
export const useBoundStore = create((...a) => ({
    ... createTeamStore(...a),
    ... createMatchesStore(...a),
    ... createTeamStatsStore(...a),
    ... createSeasonStore(...a),
    ... crateLeagueStore(...a),
    ... createUserStore(...a)

  }));