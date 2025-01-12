export enum DocType {
  Home = "home",
  Education = "education",
  Medical = "medical",
  GovDocuments = "gov document",
  Finance = "finance",
  MutualFunds = "mutual funds",
  Banking = "banking",
}

interface DocsFormProps {
  docType: DocType;
}

export default DocsFormProps;
