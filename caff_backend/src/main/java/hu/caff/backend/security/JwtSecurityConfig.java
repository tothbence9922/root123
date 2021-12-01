package hu.caff.backend.security;

import hu.caff.backend.security.keycloak.KeycloakGrantedAuthoritiesConverter;
import hu.caff.backend.security.keycloak.KeycloakJwtAuthenticationConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;

import java.util.Collection;
import java.util.List;

@Configuration
class JwtSecurityConfig {

    @Bean
    JwtDecoder jwtDecoder(List<OAuth2TokenValidator<Jwt>> validators, OAuth2ResourceServerProperties properties) {

        @SuppressWarnings("RedundantCast") NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder) JwtDecoders.fromOidcIssuerLocation(properties.getJwt().getIssuerUri());
        jwtDecoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(validators));

        return jwtDecoder;
    }

    @Bean
    OAuth2TokenValidator<Jwt> defaultTokenValidator(OAuth2ResourceServerProperties properties) {
        return JwtValidators.createDefaultWithIssuer(properties.getJwt().getIssuerUri());
    }

    @Bean
    KeycloakJwtAuthenticationConverter keycloakJwtAuthenticationConverter(Converter<Jwt, Collection<GrantedAuthority>> keycloakGrantedAuthoritiesConverter) {
        return new KeycloakJwtAuthenticationConverter(keycloakGrantedAuthoritiesConverter);
    }

    @Bean
    Converter<Jwt, Collection<GrantedAuthority>> keycloakGrantedAuthoritiesConverter( //
                                                                                      @Value("${keycloak.clientId}") String clientId, //
                                                                                      GrantedAuthoritiesMapper keycloakAuthoritiesMapper //
    ) {
        return new KeycloakGrantedAuthoritiesConverter(clientId, keycloakAuthoritiesMapper);
    }

}