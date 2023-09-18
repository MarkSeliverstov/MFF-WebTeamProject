import type { PageLoad } from './$types';

import page from '$static/swagger.html?raw';

export const load: PageLoad = async () => {
    return {
        page
    }
}
