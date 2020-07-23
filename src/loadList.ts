import * as example from "./components/examples";

export let loadList = [
    {
        middlewares: example.middlewares.list || undefined,
        useRouter: example.useRouter || undefined,
    },
];

import * as components from "./components";

loadList.pop();
for (let comp in components) {
    loadList.push({
        middlewares: components[comp]?.middlewares?.list,
        useRouter: components[comp]?.useRouter,
    });
}

export default loadList;
