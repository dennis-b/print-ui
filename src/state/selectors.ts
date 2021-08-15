import { selector } from "recoil";
import { selectedJob, selectedTemplate } from "./atoms";

export const templateState = selector({
  key: 'templateState',
  get: ({ get }) => {
    const tmpl = get(selectedTemplate);
    return tmpl;
  }
});
export const jobState = selector({
  key: 'jobState',
  get: ({ get }) => {
    const job = get(selectedJob);
    return job;
  }
});