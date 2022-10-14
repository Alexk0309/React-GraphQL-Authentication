import {gql} from '@apollo/client'

export const REGISTER_MUTATION = gql`
    mutation register(
        $user_fullname: String!
        $user_email: String!
        $user_mobile: String!
        $password: String!
    ) {
        register(
            input: {
                user_fullname: $user_fullname
                user_email: $user_email
                user_mobile: $user_mobile
                password: $password
            }
        ) 
    }
`;

export const LOGIN_MUTATION = gql`
    mutation login(
        $user_mobile: String!
        $password: String!
    ) {
        login(
            input: {
                user_mobile: $user_mobile
                password: $password
            }
        )
        {
            token
            user {
                user_id
            }
        }
    }
`;