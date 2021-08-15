import { parse } from "fast-xml-parser";

let options = {
  attributeNamePrefix: "",
  attrNodeName: "attr",
  textNodeName: "value",
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: true,
  parseNodeValue: true,
  parseAttributeValue: true
};

export const parseTemplateData = (data: any): any => {
  const { templatedetails: { templatedetail } } = parse(data, options);
  return Array.isArray(templatedetail) ? templatedetail : [templatedetail]
}
export const parseJobsData = (data: any): any => {
  const { jobs: { job } } = parse(data, options);
  return Array.isArray(job) ? job : [job]
}

export const parseData = (data: any): any => {
  return  parse(data, options);
}