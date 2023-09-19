package network.akash.akashnotifier.mapper;

import network.akash.akashnotifier.dao.SubscriptionEntity;
import network.akash.akashnotifier.dto.Subscription;
import network.akash.akashnotifier.mapper.generic.GenericEntityToDataTransferObjectMapper;
import org.mapstruct.Mapper;

@Mapper
public abstract class SubscriptionMapper
        extends GenericEntityToDataTransferObjectMapper
        <SubscriptionEntity, Subscription> {
}
