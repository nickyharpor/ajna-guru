package network.akash.akashnotifier.repository;

import network.akash.akashnotifier.dao.SubscriptionEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionRepository
        extends MongoRepository<SubscriptionEntity, ObjectId> {
    Optional<SubscriptionEntity> findByTelegramIdAndAkashAddress(int telegramId, String akashAddress);
}
