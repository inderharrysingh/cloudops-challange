
paths = ['/root/file1/file2/file3/page1.tsx', '/root/file1/page2.tsx', '/root/file1/file2/page3.tsx']


def build_filesystem(paths):
    filesystem = {}

    for path in paths:
        components = path.split('/')

        current_level = filesystem
        for component in components[1:]: 
            if component not in current_level :
                current_level[component] = {}

                if '.' in component:
                    current_level["type"] = "file"

                else :
                    current_level["type"] = "directory"

            current_level = current_level[component]

    return filesystem

def print_filesystem(filesystem, indent=0):
    for key, value in filesystem.items():
        print('  ' * indent + key)
        if isinstance(value, dict):
            print_filesystem(value, indent + 1)
        else:
            print('  ' * (indent + 1) + value)





filesystem = build_filesystem(paths)
# print_filesystem({'root': filesystem})
print(filesystem)