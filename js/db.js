/**
 * Haya Marriage Bureau - Core Data Engine
 * Standardized 50 Profiles (25M / 25F) with 2-year Age Gaps
 */

const males = [
    { id: "M-01", name: "Ahmed Raza", gender: "Male", age: 20, city: "Multan", education: "MBBS", sect: "Sunni", tier: "Gold" },
    { id: "M-02", name: "Bilal Sheikh", gender: "Male", age: 22, city: "Lahore", education: "Software Engineer", sect: "Sunni", tier: "Diamond" },
    { id: "M-03", name: "Hamza Dar", gender: "Male", age: 24, city: "Karachi", education: "BBA", sect: "Shia", tier: "Gold" },
    { id: "M-04", name: "Usman Qureshi", gender: "Male", age: 26, city: "Islamabad", education: "Masters in Finance", sect: "Sunni", tier: "Gold" },
    { id: "M-05", name: "Zain Ali", gender: "Male", age: 28, city: "Overseas", education: "PhD Physics", sect: "Sunni", tier: "Diamond" },
    { id: "M-06", name: "Ali Murtaza", gender: "Male", age: 30, city: "Multan", education: "Civil Engineer", sect: "Sunni", tier: "Gold" },
    { id: "M-07", name: "Omer Saeed", gender: "Male", age: 32, city: "Lahore", education: "Chartered Accountant", sect: "Sunni", tier: "Gold" },
    { id: "M-08", name: "Saad Kamal", gender: "Male", age: 34, city: "Karachi", education: "ACCA", sect: "Shia", tier: "Diamond" },
    { id: "M-09", name: "Hassan Hashmi", gender: "Male", age: 36, city: "Islamabad", education: "Electrical Engineer", sect: "Sunni", tier: "Gold" },
    { id: "M-10", name: "Fawad Waseem", gender: "Male", age: 38, city: "Overseas", education: "Pilot", sect: "Sunni", tier: "Gold" },
    { id: "M-11", name: "Junaid Swati", gender: "Male", age: 40, city: "Multan", education: "M.Phil", sect: "Sunni", tier: "Gold" },
    { id: "M-12", name: "Arsalan Shah", gender: "Male", age: 42, city: "Lahore", education: "PhD Education", sect: "Sunni", tier: "Diamond" },
    { id: "M-13", name: "Danish Mir", gender: "Male", age: 44, city: "Karachi", education: "Bachelors in Arts", sect: "Sunni", tier: "Gold" },
    { id: "M-14", name: "Waqas Lodhi", gender: "Male", age: 46, city: "Islamabad", education: "Masters in HR", sect: "Shia", tier: "Gold" },
    { id: "M-15", name: "Farhan Aziz", gender: "Male", age: 48, city: "Overseas", education: "Business Management", sect: "Sunni", tier: "Gold" },
    { id: "M-16", name: "Kamran Akmal", gender: "Male", age: 50, city: "Multan", education: "M.Com", sect: "Sunni", tier: "Diamond" },
    { id: "M-17", name: "Salman Butt", gender: "Male", age: 52, city: "Lahore", education: "Textile Expert", sect: "Sunni", tier: "Gold" },
    { id: "M-18", name: "Rizwan Ahmed", gender: "Male", age: 54, city: "Karachi", education: "Export Business", sect: "Sunni", tier: "Gold" },
    { id: "M-19", name: "Imran Khan", gender: "Male", age: 56, city: "Islamabad", education: "Political Science", sect: "Shia", tier: "Gold" },
    { id: "M-20", name: "Shahzad Roy", gender: "Male", age: 58, city: "Overseas", education: "Musicology", sect: "Sunni", tier: "Diamond" },
    { id: "M-21", name: "Naveed Altaf", gender: "Male", age: 60, city: "Multan", education: "Contracting", sect: "Sunni", tier: "Gold" },
    { id: "M-22", name: "Faisal Qureshi", gender: "Male", age: 62, city: "Lahore", education: "Media Professional", sect: "Sunni", tier: "Gold" },
    { id: "M-23", name: "Atif Aslam", gender: "Male", age: 64, city: "Karachi", education: "Vocalist", sect: "Sunni", tier: "Gold" },
    { id: "M-24", name: "Shehryar Munawar", gender: "Male", age: 66, city: "Islamabad", education: "Marketing", sect: "Sunni", tier: "Diamond" },
    { id: "M-25", name: "Haris Rauf", gender: "Male", age: 68, city: "Overseas", education: "Sports Science", sect: "Sunni", tier: "Gold" },
    { id: "HAYA-M-004", name: "Nadir Abbas", gender: "Male", age: 25, city: "Karachi", education: "8th Grade (Middle)", sect: "Khokhar (Islam/Madni)", tier: "Gold", caste: "Khokhar (Islam/Madni)", height: "6 ft", maritalStatus: "Single", profession: "Cloth Business (Shop Worker)", income: "Rs. 30,000", house: "5 Kanal (Owned) + Agricultural Land", family: "3 Brothers (All married), 5 Sisters (3 married, 2 unmarried)", transport: "Bike available" },
    { id: "HAYA-M-005", name: "Waqas", gender: "Male", age: 32, city: "Lahore", education: "FA", sect: "Syed (Sunni)", tier: "Premium", caste: "Syed (Sunni)", height: "5.3 ft", maritalStatus: "First Marriage", profession: "Private Job (Lahore)", income: "Rs. 60,000", house: "7 Marla (Owned)", family: "5 Brothers, 2 Sisters (Army Retired Father)", transport: "Bike available" },
    { id: "HAYA-M-006", name: "Najibullah", gender: "Male", age: 50, city: "Quetta", education: "Not Specified", sect: "Pathan Tareen (Sunni)", tier: "Premium", caste: "Pathan Tareen (Sunni)", height: "5 ft", maritalStatus: "Second Marriage", profession: "Farmer (کھیتی باڑی)", income: "Rs. 20,000", house: "4 Marla (Owned)", family: "3 Brothers, 3 Sisters (All married)", transport: "Bike available", children: "1 Son (Living with father)" }
];

const females = [
    { id: "F-01", name: "Ayesha Malik", gender: "Female", age: 21, city: "Multan", education: "Intermediate", sect: "Sunni", tier: "Gold" },
    { id: "F-02", name: "Fatima Shah", gender: "Female", age: 23, city: "Lahore", education: "Bachelors in IT", sect: "Sunni", tier: "Diamond" },
    { id: "F-03", name: "Sara Bukhari", gender: "Female", age: 25, city: "Karachi", education: "BS (Hons) English", sect: "Shia", tier: "Gold" },
    { id: "F-04", name: "Zainab Ali", gender: "Female", age: 27, city: "Islamabad", education: "Masters in Bio", sect: "Sunni", tier: "Gold" },
    { id: "F-05", name: "Mariam Hassan", gender: "Female", age: 29, city: "Overseas", education: "PhD Psychology", sect: "Sunni", tier: "Diamond" },
    { id: "F-06", name: "Hina Siddiqui", gender: "Female", age: 31, city: "Multan", education: "MBBS", sect: "Sunni", tier: "Gold" },
    { id: "F-07", name: "Rabia Khan", gender: "Female", age: 33, city: "Lahore", education: "CA Finalist", sect: "Sunni", tier: "Gold" },
    { id: "F-08", name: "Nida Rehman", gender: "Female", age: 35, city: "Karachi", education: "ACCA", sect: "Shia", tier: "Diamond" },
    { id: "F-09", name: "Zoya Mirza", gender: "Female", age: 37, city: "Islamabad", education: "Fashion Designer", sect: "Sunni", tier: "Gold" },
    { id: "F-10", name: "Amna Ghani", gender: "Female", age: 39, city: "Overseas", education: "Lawyer (LLM)", sect: "Sunni", tier: "Gold" },
    { id: "F-11", name: "Bisma Junaid", gender: "Female", age: 41, city: "Multan", education: "Masters in Stats", sect: "Sunni", tier: "Gold" },
    { id: "F-12", name: "Sana Tariq", gender: "Female", age: 43, city: "Lahore", education: "PhD History", sect: "Sunni", tier: "Diamond" },
    { id: "F-13", name: "Kiran Waqar", gender: "Female", age: 45, city: "Karachi", education: "Bachelors (BA)", sect: "Sunni", tier: "Gold" },
    { id: "F-14", name: "Maha Lodhi", gender: "Female", age: 47, city: "Islamabad", education: "Masters in Pol-Sci", sect: "Shia", tier: "Gold" },
    { id: "F-15", name: "Noor Fatima", gender: "Female", age: 49, city: "Overseas", education: "Bachelor of Commerce", sect: "Sunni", tier: "Gold" },
    { id: "F-16", name: "Esha Aziz", gender: "Female", age: 51, city: "Multan", education: "Masters in Education", sect: "Sunni", tier: "Diamond" },
    { id: "F-17", name: "Alizeh Shah", gender: "Female", age: 53, city: "Lahore", education: "Bachelors", sect: "Sunni", tier: "Gold" },
    { id: "F-18", name: "Mahira Khan", gender: "Female", age: 55, city: "Karachi", education: "Masters", sect: "Sunni", tier: "Gold" },
    { id: "F-19", name: "Maya Ali", gender: "Female", age: 57, city: "Islamabad", education: "PhD", sect: "Shia", tier: "Gold" },
    { id: "F-20", name: "Sajal Aly", gender: "Female", age: 59, city: "Overseas", education: "Bachelors", sect: "Sunni", tier: "Diamond" },
    { id: "F-21", name: "Yumna Zaidi", gender: "Female", age: 61, city: "Multan", education: "Masters", sect: "Sunni", tier: "Gold" },
    { id: "F-22", name: "Kubra Khan", gender: "Female", age: 63, city: "Lahore", education: "Bachelors", sect: "Sunni", tier: "Gold" },
    { id: "F-23", name: "Hania Aamir", gender: "Female", age: 65, city: "Karachi", education: "Masters", sect: "Sunni", tier: "Gold" },
    { id: "F-24", name: "Iqra Aziz", gender: "Female", age: 67, city: "Islamabad", education: "Bachelors", sect: "Sunni", tier: "Diamond" },
    { id: "F-25", name: "Sarah Khan", gender: "Female", age: 69, city: "Overseas", education: "Masters", sect: "Sunni", tier: "Gold" }
];

export const allProfiles = [...males, ...females];

class MarriageBureauDB {
    constructor() {
        this.INIT_DATA_KEY = 'haya_db_restored_v5';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.INIT_DATA_KEY)) {
            localStorage.setItem('haya_profiles', JSON.stringify(allProfiles));
            localStorage.setItem(this.INIT_DATA_KEY, 'true');
        }
    }

    getProfiles() {
        const p = localStorage.getItem('haya_profiles');
        return p ? JSON.parse(p) : allProfiles;
    }

    addProfile(profileData) {
        const profiles = this.getProfiles();
        profiles.push(profileData);
        localStorage.setItem('haya_profiles', JSON.stringify(profiles));
        return true;
    }

    searchProfiles(filters = {}) {
        let profiles = this.getProfiles();

        // Filter by Gender
        if (filters.gender && filters.gender !== 'Any') {
            const target = (filters.gender === 'Bride' || filters.gender === 'Female') ? 'female' : 'male';
            profiles = profiles.filter(p => p.gender.toLowerCase() === target);
        }

        // Filter by Age Range
        if (filters.age && filters.age.includes('-')) {
            const [min, max] = filters.age.split('-').map(Number);
            profiles = profiles.filter(p => p.age >= min && p.age <= max);
        }

        // Filter by City
        if (filters.city && filters.city !== 'Any') {
            profiles = profiles.filter(p => p.city.toLowerCase() === filters.city.toLowerCase());
        }

        // Filter by Education
        if (filters.education && filters.education !== 'Any') {
            profiles = profiles.filter(p => p.education.toLowerCase().includes(filters.education.toLowerCase()));
        }

        return profiles;
    }

    getCurrentUser() { return JSON.parse(localStorage.getItem('haya_session')); }
    
    logout() {
        localStorage.removeItem('haya_session');
        window.location.href = 'index.html';
    }
}

const hayaDB = new MarriageBureauDB();
export default hayaDB;
