<img src="/public/logo.png" width="100">

# [QuikGrade](https://quikgrade.vercel.app)

QuikGrade is a fast, clean, and modern grading tool for teachers. It allows you to add assignments, input scores, and instantly see totals, all in a minimal and mobile-friendly interface.

![QuikGrade Demo Video](https://github.com/user-attachments/assets/3e550915-037c-4802-a1d2-334c33f6179f)

## Features

- Add assignments for students with customizable question counts
- Instantly calculate and display total scores
- Edit and delete assignments
- Filter assignments by student, title, or date
- Export assignment or student scores as CSV

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leecheeyong/QuikGrade.git
   cd QuikGrade
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Authentication** (Email/Password).
   - Set up **Cloud Firestore** in test mode (or with secured rules).
   - Edit the `src/firebase.js` file, replace with your Firebase credentials

## Credits

- This project was inspired by [quickgra.de](https://quickgra.de/) & [quickgrade.us](https://quickgrade.us/)

## Contributing

Contributions are welcome! Please [open issues](https://github.com/leecheeyong/QuikGrade/issues) or [pull requests](https://github.com/leecheeyong/QuikGrade/pulls) for improvements and bug fixes.

## License

QuikGrade is available as open source under the terms of the [MIT License](https://github.com/leecheeyong/QuikGrade/blob/main/LICENSE).
