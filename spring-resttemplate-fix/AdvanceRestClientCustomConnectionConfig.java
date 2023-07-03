import java.util.concurrent.TimeUnit;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.conn.PoolingHtppClientConnectionManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

@Configuration
public class AdvanceRestClientCustomConnectionConfig {

    @Bean
    public PoolingHtppClientConnectionManager customizedPoolingHtppClientConnectionManager(){
      /*
        Setting the connection caching time to 5 minutes, so that the connection is in an open state for 5 mins. 
        This will add some extra time as every 5 mins SSL handshake will happen. However, software is all about trade-off,
        and here we are making sure, we don't keep calling cached API DNS
      */
      PoolingHtppClientConnectionManager connManager = new PoolingHtppClientConnectionManager(5, TimeUnit.MINUTES);
      connManager.setMaxTotal(100);    // Set maximum total connections
      connManager.setDefaultMaxPerRoute(20);     // Set maximum connections per route
    }

    @Bean
    public RestTemplate restTemplate() {
        RequestConfig reqConfig = RequestConfig.custom()
                                  .setConnectionRequestTimeout(4000) //in milliseconds
                                  .setConnectionTimeout(4000)
                                  .setSocketTimeout(4000)
                                  .build();

        HttpClientBuilder clientBuilder = HttpClientBuilder.create()
                                  .setConnectionManager(customizedPoolingHtppClientConnectionManager)
                                  .setConnectionManagerShared(true)  //this is important to set as true in case of more than one downstream APIs as we want to set a common HTTP connection pool
                                  .setDefaultRequestConfig(reqConfig);

        HttpComponentsClientHttpRequestFactory reqFactor = new HttpComponentsClientHttpRequestFactory();
        reqFactor.setHttpClient(clientBuilder.build();
      
        return new RestTemplate(reqFactor);
    }
}
