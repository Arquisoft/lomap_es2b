export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
    ],
    coveragePathIgnorePatterns: ["src/index.js", "**/Styles.tsx", "src/reportWebVitals.ts"]
}