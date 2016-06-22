module.exports = {
    default: {
        src: ['references.ts', 'src/**/*.ts', 'test/**/*.ts'],
        outDir: 'out',
        options: {
            fast: 'never',
            module: 'commonjs',
            comments: true,
            target: 'es5',
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "logErrors": true
        },
        reference: 'references.ts'
    }
};