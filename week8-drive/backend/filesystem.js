function buildFilesystem(paths) {
    const filesystem = {};

    for (const path of paths) {
        const components = path.split('/');

        let currentLevel = filesystem;
        for (const component of components.slice(1)) {

            if (!currentLevel[component]) {
                currentLevel[component] = {};

            }

            currentLevel = currentLevel[component];
        }
    }

    return filesystem;
}

// Example usage:
const paths = [
    '/root/file1/file2/file3/page1.tsx',
    '/root/file1/page2.tsx',
    '/root/file1/file2/page3.tsx'
];

const filesystem = buildFilesystem(paths);
console.log(JSON.stringify({ root: filesystem }, null, 2));
