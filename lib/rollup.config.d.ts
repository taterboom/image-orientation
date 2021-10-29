declare var _default: ({
    input: string;
    output: {
        file: string;
        format: string;
        name?: undefined;
    };
    plugins: import("rollup").Plugin[];
} | {
    input: string;
    output: {
        name: string;
        file: string;
        format: string;
    };
    plugins: import("rollup").Plugin[];
})[];
export default _default;
