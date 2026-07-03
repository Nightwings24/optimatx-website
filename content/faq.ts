// Frequently asked questions, grouped by category. Add or edit freely - the FAQ
// page renders every category and item automatically.

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  heading: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    heading: "Joining",
    items: [
      {
        q: "Do I need to be a math major to join?",
        a: "Not at all. OptimatX is open to every branch and every year - the only requirement is curiosity. Plenty of our members are from CSE, ECE, and beyond.",
      },
      {
        q: "When is recruitment?",
        a: "Recruitment is rolling. Fill the interest form on the Join page any time, and we'll reach out about the next intro session. Watch our socials for the big drives at the start of each semester.",
      },
      {
        q: "Is there a test or selection process?",
        a: "No exam. Just the interest form and an informal intro session where you meet the team and pick a track. We're a club, not a competition to get in.",
      },
      {
        q: "I'm a first-year and a bit intimidated. Should I still join?",
        a: "Yes - first-years are exactly who we're for. Start with the roadmaps, come to a reading circle, and our mentorship program pairs you with a senior.",
      },
    ],
  },
  {
    heading: "What we do",
    items: [
      {
        q: "What does the club actually do?",
        a: "A weekly Problem of the Week, member-written blog posts, reading circles and study groups, talks, competition prep (SRMC, Simon Marais, the Integration Bee), and our signature Optimization Corner. Explore the home page for the full map.",
      },
      {
        q: "How much time does it take?",
        a: "As much or as little as you want. The Problem of the Week takes minutes; events are occasional; deeper involvement (writing, organizing, competing) is there if you want it.",
      },
      {
        q: "Do I need to be good at competition math?",
        a: "No. Some members love olympiad problems; others are here for the expository writing, the visualizations, or just good company and good problems.",
      },
    ],
  },
  {
    heading: "Getting involved",
    items: [
      {
        q: "Can I write for the blog?",
        a: "Absolutely - that's the point. A post is a single Markdown file; the two-minute how-to is in the repository README. Pitch us an idea any time.",
      },
      {
        q: "How do I submit a Problem-of-the-Week solution?",
        a: "Use the 'Submit a full solution' form on the Problems page. The best write-ups get featured.",
      },
      {
        q: "Can I propose an event, a talk, or a workshop?",
        a: "Yes. Reach out via the Contact page - we love member-led sessions, and a 30-minute Friday talk is a great place to start.",
      },
      {
        q: "Is the website open-source? Can I contribute?",
        a: "It is. The whole site lives in a public GitHub repo - add a resource, fix a typo, or build a feature. See the README to get started.",
      },
    ],
  },
  {
    heading: "Competitions & logistics",
    items: [
      {
        q: "Which competitions can I train for with the club?",
        a: "SRMC (Srinivasa Ramanujan Mathematics Competition), Simon Marais, the Integration Bee, and quant-style contests. We frame Putnam as a training source. See the roadmaps for prep paths.",
      },
      {
        q: "Where and when do you meet?",
        a: "On campus at IIT Patna. Meetings, talks, and deadlines go on the calendar on the Events page.",
      },
      {
        q: "How do I get in touch?",
        a: "The Contact page has our email and socials, and the ⌘K search (press Ctrl/Cmd + K) jumps you anywhere on the site.",
      },
    ],
  },
];
