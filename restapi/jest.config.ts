export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [ 'src/controllers/*.ts', 'src/middlewares/*.ts', 'src/app.ts' ]
}
