package network.akash.akashnotifier.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class SubscriptionEntity {
    @Id
    private ObjectId objectId;
    @Field("telegram_id")
    private int telegramId;
    @Field("akash_address")
    private String akashAddress;
    @Field("is_enabled")
    private boolean enabled;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubscriptionEntity that = (SubscriptionEntity) o;
        return telegramId == that.telegramId && Objects.equals(akashAddress, that.akashAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(telegramId, akashAddress);
    }
}
