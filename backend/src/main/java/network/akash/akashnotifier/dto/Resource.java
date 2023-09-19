package network.akash.akashnotifier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Resource {
    private long count;
    private String cpu, memory, storage;
    private int network;
}
