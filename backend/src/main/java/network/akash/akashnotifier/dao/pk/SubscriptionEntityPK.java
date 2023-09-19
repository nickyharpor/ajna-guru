package network.akash.akashnotifier.dao.pk;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionEntityPK implements Serializable {
    private int telegramId;
    private String akashAddress;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SubscriptionEntityPK that = (SubscriptionEntityPK) o;
        return telegramId == that.telegramId
                && Objects.equals(akashAddress, that.akashAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(telegramId, akashAddress);
    }
}
