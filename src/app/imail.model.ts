export interface IMail {
  Host?: string;
  Username?: string;
  Password?: string;
  To: string;
  From?: string;
  Subject: string;
  Body: string;
}
