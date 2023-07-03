import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

@Configuration
public class BasicRestClientCustomConnectionConfig {

    @Bean
    public CloseableHttpClient httpClient() {
        return HttpClientBuilder.create()
                .setMaxConnTotal(100)      // Set maximum total connections
                .setMaxConnPerRoute(20)    // Set maximum connections per route
                .build();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate(new HttpComponentsClientHttpRequestFactory(httpClient()));
    }
}
