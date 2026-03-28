package network.akash.akashnotifier.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;

@Configuration
@RequiredArgsConstructor
public class MongoDatabaseConfiguration implements InitializingBean {
    private final MappingMongoConverter mappingMongoConverter;

    @Override
    public void afterPropertiesSet() {
        // configures the MongoDB converter to remove the default _class field by disabling the MongoTypeMapper.
        mappingMongoConverter.setTypeMapper(new DefaultMongoTypeMapper(null));
    }
}
