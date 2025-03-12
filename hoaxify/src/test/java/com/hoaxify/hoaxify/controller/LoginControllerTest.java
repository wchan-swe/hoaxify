package com.hoaxify.hoaxify.controller;

import com.hoaxify.hoaxify.exception.ApiError;
import com.hoaxify.hoaxify.model.User;
import com.hoaxify.hoaxify.repository.UserRepository;
import com.hoaxify.hoaxify.service.UserService;
import com.hoaxify.hoaxify.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class LoginControllerTest {

    private static final String API_1_0_LOGIN = "/api/1.0/login";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Before
    public void cleanup() {
        userRepository.deleteAll();
        // need to clear because we added interceptor in authenticate method
        // because we don't want to add authentication headers to other tests
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    // Login failure tests

    @Test
    public void postLogin_withoutUserCredentials_returnsUnauthorized() {
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void postLogin_withInvalidUserCredentials_returnsUnauthorized() {
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void postLogin_withoutUserCredentials_receiveApiError() {
        ResponseEntity<ApiError> response = login(ApiError.class);
        assertThat(response.getBody().getUrl()).isEqualTo(API_1_0_LOGIN);
    }

    @Test
    public void postLogin_withoutUserCredentials_receiveApiErrorWithoutValidationErrors() {
        ResponseEntity<String> response = login(String.class);
        assertThat(response.getBody().contains("validationErrors")).isFalse();
    }

    @Test
    public void postLogin_withIncorrectCredentials_receiveUnauthorizedWithoutWWAuthenticationHeader() {
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getHeaders().containsKey("WWW-Authenticate")).isFalse();
    }

    // Login success tests

    @Test
    public void postLogin_withValidCredentials_returnsOk() {
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4ssword");
        User saved = userService.save(user);

        authenticate("test-user", "P4ssword");
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postLogin_withValidCredentials_receiveLoggedInUser() {
        User inDB = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String, Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String, Object> body = response.getBody();
        Integer id = (Integer) body.get("id");
        assertThat(id).isEqualTo(inDB.getId());
    }

    @Test
    public void postLogin_withValidCredentials_receiveLoggedInUsersImage() {
        User inDB = userService.save(TestUtil.createValidUser());
        authenticate();

        ResponseEntity<Map<String, Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String, Object> body = response.getBody();

        // ✅ FIX: Extract `image` as a String instead of casting to a Map
        String image = (String) body.get("image");

        assertThat(image).isEqualTo(inDB.getImage());
    }

    @Test
    public void postLogin_withValidCredentials_receiveLoggedInUsersDisplayName() {
        User inDB = userService.save(TestUtil.createValidUser());
        authenticate();

        ResponseEntity<Map<String, Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String, Object> body = response.getBody();

        String displayName = (String) body.get("displayName");

        assertThat(displayName).isEqualTo(inDB.getDisplayName());
    }


    private void authenticate() {
        testRestTemplate.getRestTemplate().getInterceptors().add(new BasicAuthenticationInterceptor("test-user", "P4ssword"));
    }

    private void authenticate(String username, String password) {
        testRestTemplate.getRestTemplate().getInterceptors().add(new BasicAuthenticationInterceptor(username, password));
    }

    public <T> ResponseEntity<T> login(Class<T> responseType) {
        return testRestTemplate.postForEntity(API_1_0_LOGIN, null, responseType);
    }

    public <T> ResponseEntity<T> login(ParameterizedTypeReference<T> responseType) {
        return testRestTemplate.exchange(API_1_0_LOGIN, HttpMethod.POST, null, responseType);
    }
}
