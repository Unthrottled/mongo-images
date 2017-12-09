package io.acari.landing;

import com.google.common.collect.Lists;
import com.mongodb.ConnectionString;
import com.mongodb.MongoCredential;
import com.mongodb.async.client.MongoClientSettings;
import com.mongodb.connection.ClusterSettings;
import com.mongodb.connection.ConnectionPoolSettings;
import com.mongodb.connection.SslSettings;
import com.mongodb.connection.netty.NettyStreamFactoryFactory;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.gridfs.GridFSBucket;
import com.mongodb.reactivestreams.client.gridfs.GridFSBuckets;
import io.netty.channel.nio.NioEventLoopGroup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;

import javax.annotation.PreDestroy;

@Configuration
public class MongoConfig extends AbstractReactiveMongoConfiguration {
  private static final Logger LOGGER = LoggerFactory.getLogger(MongoConfig.class);
  private final Environment environment;

  @Autowired
  public MongoConfig(Environment environment) {
    this.environment = environment;
  }

  private final NioEventLoopGroup eventLoopGroup = new NioEventLoopGroup();

  @Bean
  @Override
  public MongoClient reactiveMongoClient() {
    ConnectionString connectionString = new ConnectionString(environment.getProperty("acari.mongo.connectionString", "localhost:27017"));
    return MongoClients.create(MongoClientSettings.builder()
            .streamFactoryFactory(NettyStreamFactoryFactory.builder()
                    .eventLoopGroup(eventLoopGroup)
                    .build())
            .sslSettings(SslSettings.builder()
                    .applyConnectionString(connectionString)
                    .build())
        .credentialList(Lists.newArrayList(
            MongoCredential.createCredential(
                environment.getProperty("acari.mongo.username",
                    "admin"), "admin",
                environment.getProperty("acari.mongo.pass", "123abc").toCharArray())))
            .clusterSettings(ClusterSettings.builder()
                    .applyConnectionString(connectionString)
                    .build())
            .build());
  }

  @Override
  protected String getDatabaseName() {
    return "landing";
  }

  @Bean
  public GridFSBucket gridFsTemplate(MongoClient reactiveMongoClient) throws Exception {
    return GridFSBuckets.create(reactiveMongoClient.getDatabase(environment.getProperty("acari.mongo.landingDatabase", "landing")));
  }

  @PreDestroy
  public void shutdown(){
    eventLoopGroup.shutdownGracefully();
  }
}
