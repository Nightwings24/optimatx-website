// Magazine / journal issues for the Publications page. The newsletter archive
// is MDX-driven (content/newsletter/); this file only lists the magazine's PDF
// issues. To publish one: drop the PDF in public/assets/publications/ and add
// an entry here (plain "/assets/..." path - the page prefixes the basePath).
// While the list is empty the page shows an "in the works" note.

export interface MagazineIssue {
  id: string;
  title: string;
  dateChip: string; // "SPRING 2027"
  blurb: string;
  pdf: string; // "/assets/publications/<file>.pdf"
}

export const magazineIssues: MagazineIssue[] = [];
