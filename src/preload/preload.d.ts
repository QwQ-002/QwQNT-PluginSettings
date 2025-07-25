import { C as CoreExports, F as FrameworkExports } from './exports-BGkkLqe5.js';

interface ContextRenderer {
    core: CoreExports;
    framework: FrameworkExports;
}
declare global {
    const qwqnt: Readonly<ContextRenderer>;
    function evalModule(script: string): void;
}

export type { ContextRenderer };
