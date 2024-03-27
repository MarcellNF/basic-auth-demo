package de.neuefische.backend.appuser;

public record AppUserDto(
        String username,
        String password,
        String email,
        String avatarUrl
) {
}
