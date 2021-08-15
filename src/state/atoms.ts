import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const selectedTemplate = atom({
  key: 'selectedTemplate',
  default: {},
  effects_UNSTABLE: [persistAtom]
});

export const selectedJob = atom({
  key: 'selectedJob',
  default: {},
  effects_UNSTABLE: [persistAtom]
});