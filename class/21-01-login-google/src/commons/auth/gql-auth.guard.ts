import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// rest-api 쓸 경우에는, jwt-accessStrategy에서 세팅 끝남.
// 그냥 AuthGuard를 resolver에서 바로 쓰면됨.

// graphQL 은 한층 더 감싸져있다???? 어쨌든 graphQL 전용 Guard 따로 필요.
// 세팅해놓은 AuthGuard를 따와서 만들자.
export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
