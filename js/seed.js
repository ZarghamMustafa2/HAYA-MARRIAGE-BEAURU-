/**
 * Haya Marriage Bureau - Initial Seed Data
 * Professional Pakistani Profiles
 */

const SEED_PROFILES = [
    { id: 1, name: "Sara Chaudhry", gender: "female", age: 26, city: "Lahore", sect: "Sunni", education: "Masters in English", profession: "Lecturer", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", contact: "+92 300 0000001" },
    { id: 2, name: "Bilal Sheikh", gender: "male", age: 31, city: "Karachi", sect: "Sunni", education: "MBA Finance", profession: "Banker", status: "approved", tier: "diamond", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", contact: "+92 321 0000002" },
    { id: 3, name: "Zainab Malik", gender: "female", age: 24, city: "Islamabad", sect: "Sunni", education: "BS SE", profession: "Software Engineer", status: "approved", tier: "free", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", contact: "+92 333 0000003" },
    { id: 4, name: "Hamza Abbasi", gender: "male", age: 33, city: "Rawalpindi", sect: "Shia", education: "MBBS", profession: "Doctor", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", contact: "+92 345 0000004" },
    { id: 5, name: "Nida Siddiqui", gender: "female", age: 29, city: "Faisalabad", sect: "Sunni", education: "M.Phil Psychology", profession: "Psychologist", status: "approved", tier: "free", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", contact: "+92 301 0000005" },
    { id: 6, name: "Omar Khalid", gender: "male", age: 28, city: "Lahore", sect: "Sunni", education: "Chartered Accountant", profession: "Auditor", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", contact: "+92 300 1112223" },
    { id: 7, name: "Amna Farooq", gender: "female", age: 25, city: "Karachi", sect: "Sunni", education: "BDS", profession: "Dentist", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400", contact: "+92 321 4445556" },
    { id: 8, name: "Zubair Ahmed", gender: "male", age: 35, city: "Overseas", sect: "Sunni", education: "MS Data Science", profession: "Senior AI Engineer", status: "approved", tier: "diamond", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", contact: "+971 50 1234567" },
    { id: 9, name: "Hira Naveed", gender: "female", age: 27, city: "Islamabad", sect: "Sunni", education: "LLM", profession: "Corporate Lawyer", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2a04?auto=format&fit=crop&q=80&w=400", contact: "+92 333 7778889" },
    { id: 10, name: "Ali Raza", gender: "male", age: 30, city: "Multan", sect: "Shia", education: "Civil Engineering", profession: "Project Manager", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", contact: "+92 300 9998887" },
    { id: 11, name: "Sana Javed", gender: "female", age: 23, city: "Lahore", sect: "Sunni", education: "BBA", profession: "Marketing Exec", status: "approved", tier: "free", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400", contact: "+92 300 5556667" },
    { id: 12, name: "Kamran Akmal", gender: "male", age: 32, city: "Karachi", sect: "Sunni", education: "Masters in Media", profession: "News Anchor", status: "approved", tier: "diamond", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", contact: "+92 321 8889990" },
    { id: 13, name: "Mahnoor Baloch", gender: "female", age: 26, city: "Peshawar", sect: "Sunni", education: "Pharm-D", profession: "Pharmacist", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", contact: "+92 313 0000006" },
    { id: 14, name: "Fahad Mustafa", gender: "male", age: 29, city: "Dubai", sect: "Sunni", education: "Bachelors", profession: "Business Owner", status: "approved", tier: "gold", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400", contact: "+971 52 9990001" },
    { id: 15, name: "Ayesha Omer", gender: "female", age: 28, city: "Lahore", sect: "Sunni", education: "Graphic Design", profession: "Creative Director", status: "approved", tier: "diamond", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400", contact: "+92 300 7770001" }
];

const SEED_USERS = [
    {
        id: 101,
        name: "Admin Manager",
        email: "admin@haya.com",
        password: "admin",
        role: "admin",
        tier: "diamond"
    },
    {
        id: 102,
        name: "Guest User",
        email: "guest@example.com",
        password: "user123",
        role: "member",
        tier: "free"
    }
];

export { SEED_PROFILES, SEED_USERS };
