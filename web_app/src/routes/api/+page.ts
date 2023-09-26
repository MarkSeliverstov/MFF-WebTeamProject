import type { PageLoad } from './$types';

import page from '$src/swagger.html?raw';

export const load: PageLoad = async () => {
    return {
        page
    }
}
