# Profile & Phone Verification

## Endpoints

- GET `/api/auth/user` — get current user details
- PUT `/api/users/me` — update current user's profile (username is ignored)
  - Body: `{ name, phoneNumber, birth, gender, state }`

## Notes

- For security, the server no longer returns verification codes in API responses in production; instead, codes must be sent via SMS or email.
- Username changes are restricted: users cannot change their own username via `/users/me`.
- Changing password should use a dedicated flow requiring the old password.
