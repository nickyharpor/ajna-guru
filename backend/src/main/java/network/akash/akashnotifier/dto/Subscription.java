package network.akash.akashnotifier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    private int telegramId;
    private String akashAddress;
    private boolean enabled;
}
