import { Provider } from '@angular/core'

import { AuthTokenProvider } from '@features/users/auth/infra'

export const DI_TOKEN: Provider[] = [AuthTokenProvider]
