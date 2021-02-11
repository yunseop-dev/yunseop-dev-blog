import { makeVar } from '@apollo/client';
import { Account } from "../generated/graphql";

export const isLoggedInVar = makeVar<boolean>(false);
export const myInfoVar = makeVar<Account | null>(null);
