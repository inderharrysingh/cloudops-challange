interface Filesystem {
    [key: string]: Filesystem
}

export function getFileSystem(paths: string[]): Filesystem {
    const filesystem: Filesystem = {};

    for (const path of paths) {
        const components = path.split('/');

        let currentLevel: Filesystem = filesystem;
        for (const component of components.slice(1)) {
            if (!currentLevel[component]) {
                currentLevel[component] = {};
            }

            currentLevel = currentLevel[component] as Filesystem;
        }
    }

    return filesystem;
}

// Example usage: