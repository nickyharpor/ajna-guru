package network.akash.akashnotifier.service;

import lombok.RequiredArgsConstructor;
import network.akash.akashnotifier.dao.SubscriptionEntity;
import network.akash.akashnotifier.dto.Subscription;
import network.akash.akashnotifier.mapper.SubscriptionMapper;
import network.akash.akashnotifier.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionMapper mapper;
    private final SubscriptionRepository repository;

    public Subscription save(Subscription subscription) {
        var optionalSubscription = repository.findByTelegramIdAndAkashAddress(
                subscription.getTelegramId(), subscription.getAkashAddress());
        SubscriptionEntity entity;
        if (optionalSubscription.isPresent()) {
            entity = optionalSubscription.get();
            update(entity, subscription);
        } else {
            entity = toEntity(subscription);
        }
        return toDTO(repository.save(entity));
    }

    public Subscription update(int telegramId, String akashAddress
            , Subscription subscription) {
        var entity = repository.findByTelegramIdAndAkashAddress(telegramId
                , akashAddress).orElseThrow(() -> new RuntimeException(
                "Subscription not found."));
        update(entity, subscription);
        return toDTO(repository.save(entity));
    }

    public void delete(int telegramId, String akashAddress) {
        var entity = repository.findByTelegramIdAndAkashAddress(telegramId
                , akashAddress).orElseThrow(() -> new RuntimeException(
                "Subscription not found."));
        repository.delete(entity);
    }

    public Subscription findByTelegramIdAndAkashAddress(int telegramId
            , String akashAddress) {
        Optional<SubscriptionEntity> optionalSubscription = repository
                .findByTelegramIdAndAkashAddress(telegramId, akashAddress);
        if (optionalSubscription.isPresent()) {
            return toDTO(optionalSubscription.get());
        }
        return new Subscription(telegramId, akashAddress, false);
    }

    private Subscription toDTO(SubscriptionEntity entity) {
        return mapper.toDTO(entity);
    }

    private SubscriptionEntity toEntity(Subscription dto) {
        return mapper.toEntity(dto);
    }

    private void update(SubscriptionEntity entity, Subscription dto) {
        mapper.update(entity, dto);
    }
}
